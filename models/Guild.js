import * as mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new Schema(
  {
    guildName: { type: String, required: true, unique: true, required: true },
    jobCategory: {
      type: String,
      required: true,
      enum: [
        "لوازم خانگی و محصولات",
        "لوازم ساختمانی و محصولات",
        "لوازم کشاورزی و محصولات",
        "صنایع حمل‌ونقل پیشرفته",
        "تولیدات آهن و فلزات سخت",
        "تولیدات شیمیایی",
        "صنایع نفت، گاز و پتروشیمی",
        "تولیدات غذایی",
        "تولیدات پلاستیکی و پلیمر",
        "صنایع ماشین‌آلات و تجهیزات صنعتی",
        "تولیدات دارویی",
        "تولیدات انرژی و نیروگاه‌ها",
        "تولیدات فناوری و الکترونیک",
        "صنایع آرایشی و بهداشتی",
        "صنایع تجهیزات و لوازم پزشکی",
        "تولیدات چوب و محصولات چوبی",
        "تولیدات مواد معدنی و سنگ",
        "تولیدات نساجی و پوشاک",
        "صنایع تفریحی و ورزشی",
        "صنایع بازیافت و مدیریت پسماند",
        "تولیدات جواهرات و صنایع دستی",
        "تولیدات نرم‌افزار و فناوری‌های دیجیتال",
        "صنایع بسته‌بندی و چاپ",
        "تولیدات کاغذ و محصولات کاغذی",
        "تولیدات شیشه و محصولات شیشه‌ای",
        "خدمات عمومی",
        "خدمات الکترونیک",
        "خدمات خودرویی",
        "خدمات آزمایشگاهی",
        "خدمات فلزکاری",
        "خدمات گردشگری",
        "خدمات عمرانی",
        "خدمات ارتباطی",
        "خدمات بهداشتی",
        "خدمات صوت و تصویر",
        "خدمات مالی و حسابداری",
        "خدمات حقوقی",
        "خدمات تبلیغات و بازاریابی",
        "خدمات آموزشی و مشاوره",
        "خدمات سلامت و درمان",
        "خدمات بیمه",
        "خدمات حمل‌ونقل و لجستیک",
        "خدمات برنامه‌ریزی و مدیریت پروژه",
        "خدمات تعمیرات و نگهداری",
        "خدمات طراحی و معماری",
        "خدمات فناوری اطلاعات و شبکه",
        "خدمات بازرگانی و تجارت الکترونیک",
        "خدمات امنیتی، حفاظتی و حراستی",
        "خدمات هنری، فرهنگی و سرگرمی",
        "خدمات املاک و مستغلات",
        "خدمات گردشگری سلامت",
        "خدمات زیبایی و آرایش"
      ],
    },
  },
  { timestamps: true }
);
const GuildModel = mongoose.models.Guild || mongoose.model("Guild", schema);
export default GuildModel;
