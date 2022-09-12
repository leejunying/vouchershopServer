const Voucher = require("../models/voucher");

function to_slug(str) {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase();

  // xóa dấu
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
  str = str.replace(/(đ)/g, "d");

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, "");

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, "-");

  // xóa phần dự - ở đầu
  str = str.replace(/^-+/g, "");

  // xóa phần dư - ở cuối
  str = str.replace(/-+$/g, "");

  // return
  return str;
}
const GenerateSlug = async (name, key) => {
  let voucherdata = await Voucher.find({ title: name });

  let slugname = name.replace(/\s+/g, "");

  let count = 0;

  if (voucherdata.length != 0) {
    let result = voucherdata.filter((item) => {
      if (slugname.localeCompare(item.title.replace(/\s+/g, "")) == 0) {
        count++;
      }
    });
  }

  slugname = to_slug(slugname);

  return `${slugname}-${key}-${count}`;
};

const voucherController = {
  newVoucher: async (req, res) => {
    try {
      let newVoucher = req.body;
      console.log(newVoucher);

      let slug = await GenerateSlug(newVoucher["title"], newVoucher["key"]);

      newVoucher.slug = slug;

      const voucher = await Voucher.create(newVoucher);

      console.log(voucher);

      return res.status(200).json({ msg: "Add new succes" });
    } catch (err) {
      console.log(err);

      return res.status(500).json(err);
    }
  },
  updateVoucher: async (req, res) => {
    try {
      const voucher = req.body;

      console.log(voucher);

      const foundVoucher = await Voucher.findByIdAndUpdate(voucher.id, voucher);

      console.log(foundVoucher);

      return res.status(200).json({ success: true, foundVoucher });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  deleteVoucher: async (req, res) => {
    try {
      const { id } = req.body;
      console.log(req.body);
      await Voucher.findByIdAndDelete(id);
      return res.status(200).json("Voucher deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getAllVoucher: async (req, res) => {
    try {
      const page = req.query.page;

      console.log(page);

      let count = 0;
      let perpage = 10;
      let total = 0;
      let Page = page * 1 || 0;

      count = await Voucher.find().countDocuments();
      total = Math.ceil(count / perpage);

      let voucher = await Voucher.find()
        .populate("categorys", "title")
        .skip(perpage * Page - perpage)
        .limit(perpage)
        .sort({ createdAt: -1 });

      res.status(200).json({ voucher: voucher, totalPage: total });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getVoucherByID: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findById(id);
      return res.status(200).json(voucher);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getVoucherByPage: async (req, res) => {
    try {
      const tag = req.query.tag;
      const page = req.query.page;
      const categorykey = req.query.key;

      console.log(tag, page, categorykey);

      let voucher = {};
      let count = 0;
      let perpage = 10;
      let total = 0;
      let Page = page * 1 || 0;

      if (categorykey) {
        if (categorykey == "SALE") {
          count = await Voucher.find({
            status: categorykey,
          }).countDocuments(); // counter page
          total = Math.ceil(count / perpage);

          voucher = await Voucher.find({ status: categorykey })
            .skip(perpage * Page - perpage)
            .limit(perpage);

          return res.status(200).json({ data: voucher, totalPage: total });
        } else {
          count = await Voucher.find({
            key: categorykey,
          }).countDocuments(); // counter page
          total = Math.ceil(count / perpage);

          voucher = await Voucher.find({ key: categorykey })
            .skip(perpage * Page - perpage)
            .limit(perpage);

          return res.status(200).json({ data: voucher, totalPage: total });
        }
      }
      if (tag) {
        let all = await Voucher.find().populate("categorys");
        let filterarr = [];
        var newall = all.map((item) => {
          item.categorys.map((cate) => {
            console.log(cate.key, tag);
            if (JSON.stringify(cate.key).includes(tag) == true) {
              filterarr.push(item);
            }
          });
        });

        count = filterarr.length;
        filterarr = filterarr.filter((item, indx) => {
          return indx < 10;
        });

        total = Math.ceil(count / perpage);

        return res.status(200).json({ data: filterarr, totalPage: total });
      } else {
        res.status(500).json("is not id");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getVoucherBySlug: async (req, res) => {
    try {
      let data = await Voucher.findOne(req.params)
        .populate("categorys")
        .then((p) => res.status(200).json(p))
        .catch((error) => res.status(400).json(error));
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getSliderVoucher: async (req, res) => {
    try {
      let vouchers = await Voucher.find().sort({ createdAt: -1 }).limit(4);

      return res.status(200).json(vouchers);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //Demo top 4 item  any category

  getTopVoucher: async (req, res) => {
    try {
      const Top = [];

      // //Exp1

      Top.push({
        title: "Combo Vouchers",
        items: await Voucher.find({ key: "CV" })
          .sort({ createdAt: -1 })
          .limit(4),
      });
      Top.push({
        title: "Dịch Vụ Hàng Không",
        items: await Voucher.find({ key: "DVHK" })
          .sort({ createdAt: -1 })
          .limit(4),
      });
      Top.push({
        title: "Dịch Vụ Nghỉ Dưỡng",
        items: await Voucher.find({ key: "DVND" })
          .sort({ createdAt: -1 })
          .limit(4),
      });
      Top.push({
        title: "Dịch Vụ Liên Kết",
        items: await Voucher.find({ key: "DVLK" })
          .sort({ createdAt: -1 })
          .limit(4),
      });
      Top.push({
        title: "Dịch Vụ Golf",
        items: await Voucher.find({ key: "DVG" })
          .sort({ createdAt: -1 })
          .limit(4),
      });

      return res.status(200).json(Top);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // date between  date
  getVoucherByDate: async (req, res) => {
    try {
    } catch (err) {}
  },

  getSearchVoucher: async (req, res) => {
    try {
      const { text } = req.params;
      console.log(text);
      const found = await Voucher.find({
        title: { $regex: `.*` + text + `.*`, $options: "i" },
      }).limit(5);
      console.log(found);
      return res.status(200).json(found);
    } catch (err) {
      return res.status(200).json(err);
    }
  },
};
module.exports = voucherController;
