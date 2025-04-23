import { Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { ReactElement } from 'react';

export const firtsEnterText = (): ReactElement => {
  return (
    <Box sx={{ py: 1, textAlign: 'center' }}>
      <Typography sx={{ mb: 1 }}>به کارباکار خوش آمدید❤</Typography>
      <Typography>اگر محصولی دارید و یا خدماتی ارائه می کنید؛</Typography>
      <Typography sx={{ mb: 1 }}>
        👉در منوی سمت راست یک کسب و کار جدید بسازید
      </Typography>
      <Divider
        sx={{ width: '50%', mx: 'auto', my: 1, borderBottomWidth: '2px' }}
      />
      <Typography sx={{ mb: 1 }}>
        و یا اگر دوست داشتید می توانید عضو کسب و کارهای دیگر شوید
      </Typography>
      <Typography sx={{ mb: 1 }}>
        اگر کسب و کاری که میخواهید عضو آن شوید را می شناسید آن را از بخش جستجوی
        بالا پیدا کنید 👆
      </Typography>
      <Typography sx={{ mb: 1 }}>
        و یا در منوی سمت راست 👉 از بخش لیست کسب و کارها، هر کسب و کاری را که
        دوست دارید پیدا کنید
      </Typography>
      <Divider
        sx={{ width: '50%', mx: 'auto', my: 1, borderBottomWidth: '2px' }}
      />
      <Typography>
        کسب و کارها راههای تماس خود را در صفحه کسب و کار اعلام می کنند
      </Typography>
      <Typography sx={{ mb: 1 }}>
        و شما می توانید برای استخدام شدن با آنها تماس بگیرید و هماهنگ نمایید
      </Typography>
      <Typography>
        اگر کسب و کار مد نظر خود را پیدا نکردید کاریابی ها را در بخش جستجو پیدا
        کنید و از آنها کمک بگیرید✌
      </Typography>
    </Box>
  );
};

export const SecondTabText = (): ReactElement => {
  return (
    <Box sx={{ py: 1, textAlign: 'center' }}>
      <Typography sx={{ mb: 1, fontSize: 14 }}>
        کسب وکارهایی که در این بخش می بینید به محصولات و خدمات شما نیاز دارند
      </Typography>
      <Divider
        sx={{ width: '50%', mx: 'auto', my: 1, borderBottomWidth: '2px' }}
      />
      <Typography sx={{ fontSize: 14 }}>
        شما می توانید با انتخاب صنف مد نظر خود نیازهای اعلام شده در هر صنف را
        ببینید
      </Typography>
      <Typography sx={{ mb: 1, fontSize: 14 }}>
        با زدن روی هر کسب و کار وارد صفحه آن کسب و کار می شوید و می توانید آنها
        را بعنوان دریافت کننده خود انتخاب کنید
      </Typography>
      <Divider
        sx={{ width: '50%', mx: 'auto', my: 1, borderBottomWidth: '2px' }}
      />
      <Typography sx={{ fontSize: 14 }}>
        با زدن دکمه تغییر ظرفیت تولید👇 مقدار محصولی که می خواهید ماهانه به آنها
        ارائه دهید را مشخص نمایید
      </Typography>
    </Box>
  );
};

export const SecondTabGuestText = (): ReactElement => {
  return (
    <Box sx={{ py: 1, textAlign: 'center' }}>
      <Typography sx={{ mb: 1, fontSize: 14 }}>
        در این بخش نیازهای بازار را می توانید مشاهده نمایید
      </Typography>
      <Divider
        sx={{ width: '50%', mx: 'auto', my: 1, borderBottomWidth: '2px' }}
      />
      <Typography sx={{ fontSize: 14 }}>
        شما می بینید که برای خدمات هر صنف چه مقدار تقاضا وجود دارد
      </Typography>
    </Box>
  );
};

export const thirdTabText = (): ReactElement => {
  return (
    <Box sx={{ py: 1, textAlign: 'center' }}>
      <Typography sx={{ mb: 1, fontSize: 14 }}>
        ساخت یک اتحاد با ثبت نیاز یک کسب و کار به مقداری مشخص از محصولات و خدمات
        یک یا چند صنف و زمان مشخص شروع می شود{' '}
      </Typography>
      <Typography sx={{ mb: 1, fontSize: 14 }}>
        و این اعلان نیاز به ترتیب فاصله جغرافیایی به نمایندگان اصناف تامین کننده
        نمایش داده می شود
      </Typography>
      <Divider
        sx={{ width: '50%', mx: 'auto', my: 1, borderBottomWidth: '2px' }}
      />
      <Typography sx={{ fontSize: 14 }}>
        صنفی که به محصولات آن نیاز دارید باید از قبل وجود داشته باشد و همه اعضا
        باید یکدیگر را تایید کنند
      </Typography>
      <Typography sx={{ mb: 1, fontSize: 14 }}>
        کسب و کارها با عضویت در اتحاد تمام اعضای قبلی را تایید می نمایند و اعضای
        قبلی نیز با رای دادن به عضو جدید می توانند با آن متحد شوند
      </Typography>
      <Typography sx={{ mb: 1, fontSize: 14 }}>
        اعضای قبلی در صورت رای منفی به عضو جدید او را از اتحاد اخراج می نمایند
      </Typography>
      <Divider
        sx={{ width: '50%', mx: 'auto', my: 1, borderBottomWidth: '2px' }}
      />
      <Typography sx={{ fontSize: 14 }}>
        افراد در هر مرحله ای غیر از فعال شدن اتحاد می توانند انصراف داده و از
        اتحاد خارج شوند
      </Typography>
      <Divider
        sx={{ width: '50%', mx: 'auto', my: 1, borderBottomWidth: '2px' }}
      />
      <Typography sx={{ fontSize: 14 }}>
        سوابق اتحاد های شکل گرفته از بین نمی روند و در صفحه هر کسب و کار نمایش
        داده می شود
      </Typography>
      <Typography sx={{ fontSize: 14 }}>
        هر کسب و کار تنها می تواند 5 اتحاد در ماه ایجاد نماید
      </Typography>
    </Box>
  );
};

export const billText = (): ReactElement => {
  return (
    <Box sx={{ py: 1, textAlign: 'center' }}>
      <Typography>اینجا بخش دریافت و ارسال صورتحساب است</Typography>
      <Divider
        sx={{ width: '50%', mx: 'auto', my: 1, borderBottomWidth: '2px' }}
      />
      <Typography sx={{ fontSize: 14 }}>
        صورتحساب ها توسط نماینده کسب و کارها ایجاد و ارسال می شوند
      </Typography>
      <Divider
        sx={{ width: '50%', mx: 'auto', my: 1, borderBottomWidth: '2px' }}
      />
      <Typography sx={{ fontSize: 14 }}>
        زمانی که صورتحساب تایید می شود محصولات ارائه شده در جدولی در کسب و کار
        تامین کننده نمایش داده می شود
      </Typography>
      <Typography sx={{ fontSize: 14 }}>
        البته در صفحه کسب و کار دریافت کننده جهت حفظ حریم شخصی بدون ذخیره و
        نمایش نام محصول ثبت می شود
      </Typography>
      <Typography sx={{ fontSize: 14 }}>
        بطور مثال بجای 100 عدد صندلی پلاستیکی برند فلان از فلان کسب و کار نوشته
        می شود 100 عدد محصول از صنف فروش لوازم خانگی
      </Typography>
      <Divider
        sx={{ width: '50%', mx: 'auto', my: 1, borderBottomWidth: '2px' }}
      />
      <Typography sx={{ my: 2 }} color="error">
        * تایید شما به معنی تایید کمیت و کیفیت و رضایت شما از محصولات دریافتی
        است
      </Typography>
    </Box>
  );
};

export const iconText: string = `
هر کاربر می تواند تا سقف 3 کسب و کار عضو باشد 
یک کسب و کار اصلی و دو تای دیگر فرعی خواهند بود
زمانی که محصولی از دیگران دریافت می کنید این به حساب کسب و کار اصلی شما ثبت می شود 
و زمانی که درخواست محصول ایجاد می کنید دیگران با توجه به کسب و کار اصلی شما در خصوص ارئه محصول به شما تصمیم گیری خواهند کرد 
جهت جلوگیری از ایجاد سوابق سوری، تغییر کسب و کار اصلی تنها هر 14 روز امکانپذیر است
`;

export const resignationText1: string = `
شما در کسب و کاری که برای استعفا از آن اقدام نموده اید تنها هستید! 
کسب و کارها قابل حذف نیستند و همیشه یک نفر عضو باید در آنها باقی بماند
برای تغییر شغل می توانید مشخصات کسب و کار خود بصورت کامل ویرایش نمایید
در صورت اصرار به استعفا باید یک نفر را استخدام نموده و مجدد به این بخش بازگردید
`;

export const resignationText2: string = `
شما بعنوان نماینده کسب و کار بایستی قبل از استعفا جانشین خود را انتخاب نمایید
کدکاربری جانشین خود را که باید عضو همین کسب و کار باشد را وارد نمایید
`;

export const OthersRequestText: string = `
گزینه های مربوط به پاسخ تنها به کاربرانی که نماینده کسب و کار اصلی خود هستند نمایش داده می شود
همچنین اطلاعات مربوط به کسب و کار متقاضی تنها به افرادی نمایش داده می شود که صنف تعیین شده در درخواست مشتری با حداقل یکی از صنف های کسب و کارهای 
تامین کننده برابر باشد
`;

export const FirtstTabText = (): ReactElement => {
  return (
    <Box sx={{ py: 1, textAlign: 'center' }}>
      <Typography sx={{ mb: 1, fontSize: 14 }}>
        با زدن دکمه اعلام نیاز👇 هر چیزی که برای خود یا کسب و کارخود نیاز دارید
        اعلام کنید
      </Typography>
      <Divider
        sx={{ width: '50%', mx: 'auto', my: 1, borderBottomWidth: '2px' }}
      />
      <Typography sx={{ mb: 1, fontSize: 14 }}>
        نماینده های کسب و کارهایی که به محصولات آنها نیاز دارید درخواست شما را
        می توانند ببینند و صفحه کسب و کار شما را ملاحظه نمایند
      </Typography>
      <Typography sx={{ mb: 1, fontSize: 14 }}>
        کارباکار بر این اصل استوار است که تولید کننده ها به هر کسی که بخواهند می
        توانند محصول خود را ارئه نمایند لذا با توجه به محدودیت محصولاتی که دارند
        آنها عنوان شغل و مقدار و نوع محصولاتی که متقاضیان به دیگران ارائه داده
        اند را بررسی کرده و در مورد اینکه بعنوان دریافت کننده محصول آنها انتخاب
        شوند تصمیم می گیرند
      </Typography>
      <Typography>
        لذا تا زمانی که ارزشی تولید نکنید و یا محصول یا خدماتی به دیگر اعضا
        ارائه ننمایید شانس کمی برای دریافت محصولات از اعضا خواهید داشت
      </Typography>
    </Box>
  );
};

export const FirtstTabText2 = (): ReactElement => {
  return (
    <Box sx={{ py: 1, textAlign: 'center' }}>
      <Typography sx={{ mb: 1, fontSize: 14 }}>
        👇کسب و کارهایی که به ارائه محصول به کسب و کار شما متعهد می شوند در این
        قسمت به نمایش در می آیند
      </Typography>
      <Typography sx={{ mb: 1, fontSize: 14 }}>
        جهت دریافت این محصولات می توانید با آنها هماهنگ نمایید📞
      </Typography>
    </Box>
  );
};

export const createBusiness_selectAsPrimary = (): ReactElement => {
  return (
    <Box sx={{ py: 1, textAlign: 'center' }}>
      <Typography>
        داشتن چند شغل و عضویت در چند کسب و کار مختلف تا سقف 3 عدد مجاز است اما
        محصولاتی که دریافت می کنید به حساب کسب و کار اصلی شما منظور می شود
      </Typography>
      <Typography>
        تغییر کسب و کار اصلی تنها هر 14 روز یکبار امکانپذیر است
      </Typography>
    </Box>
  );
};

export const AllBusinessesText = (): ReactElement => {
  return (
    <Box sx={{ py: 1, textAlign: 'center' }}>
      <Typography sx={{ fontSize: 14 }}>
        برای نمایش کسب و کارها بر اساس فاصله بایستی اجازه دسترسی به GPS را تایید
        نمایید
      </Typography>
      <Typography sx={{ fontSize: 14 }}>
        توجه داشته باشید موقعیت مکانی که در این صفحه مشخص می کنید جایی ذخیره نمی
        شود و برای محاسبه و نمایش نزدیکترین کسب و کارها در همین صفحه کاربرد دارد
      </Typography>
    </Box>
  );
};
