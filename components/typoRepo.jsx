import { Box, Typography } from "@mui/material"
import Divider from '@mui/material/Divider';


export const firtsEnterText = () => {

    return <Box sx={{ py: 1, textAlign: "center" }}>
        <Typography sx={{ mb: 1 }}>
            به کارباکار خوش آمدید❤
        </Typography>
        <Typography>
            اگر محصولی دارید و یا خدماتی ارائه می کنید؛
        </Typography>
        <Typography sx={{ mb: 1 }}>
            👉در منوی سمت راست یک کسب و کار جدید بسازید
        </Typography>
        <Divider sx={{ width: '50%', mx: 'auto', my: 1, borderBottomWidth: '2px' }} />
        <Typography sx={{ mb: 1 }}>
            و یا اگر خودتان کسب و کاری و تخصصی ندارید می توانید عضو کسب و کارهای دیگر شوید
        </Typography>
        <Typography sx={{ mb: 1 }}>
            اگر کسب و کاری که میخواهید عضو آن شوید را می شناسید آن را از بخش جستجوی بالا پیدا کنید 👆
        </Typography>
        <Typography sx={{ mb: 1 }}>
            و یا در منوی سمت راست 👉 از بخش لیست کسب و کارها، هر کسب و کاری را که دوست دارید پیدا کنید
        </Typography>
        <Divider sx={{ width: '50%', mx: 'auto', my: 1, borderBottomWidth: '2px' }} />
        <Typography>
            کسب و کارها راههای تماس خود را در صفحه کسب و کار اعلام می کنند
        </Typography>
        <Typography sx={{ mb: 1 }}>
            و شما می توانید برای استخدام شدن با آنها تماس بگیرید و هماهنگ نمایید
        </Typography>
        <Typography>اگر هیچ کسب و کار خوبی پیدا نکردید کاریابی ها را در بخش جستجو پیدا کنید✌</Typography>
    </Box>
}
export const SecondTabText = () => {

    return <Box sx={{ py: 1, textAlign: "center" }}>
        <Typography sx={{ mb: 1, fontSize: 12 }}>
            کسب وکارهایی که در این بخش می بینید به محصولات و خدمات شما نیاز دارند
        </Typography>
        <Divider sx={{ width: '50%', mx: 'auto', my: 1, borderBottomWidth: '2px' }} />
        <Typography sx={{ fontSize: 12 }}>
            شما می توانید با انتخاب صنف مد نظر خود نیازهای اعلام شده در هر صنف را ببینید
        </Typography>
        <Typography sx={{ mb: 1, fontSize: 12 }}>
            با زدن روی هر کسب و کار وارد صفحه آن کسب و کار می شوید و می توانید آنها را بعنوان دریافت کننده خود انتخاب کنید
        </Typography>
        <Divider sx={{ width: '50%', mx: 'auto', my: 1, borderBottomWidth: '2px' }} />
        {/* <Typography sx={{ mb: 1, fontSize: 12 }}>
            هر کسب و کار از سه طریق می تواند محصولات خود را ارئه نماید
        </Typography>
        <Typography sx={{textAlign:"right", fontSize: 12 }}>
            اول: ازائه محصول به تمام اعضای کارباکار که به او مراجعه می کنند از طریق بخش صورتحساب
        </Typography>
        <Typography sx={{textAlign:"right", fontSize: 12 }}>
            دوم: از طریق عضویت در اتحاد
        </Typography>
        <Typography sx={{textAlign:"right", fontSize: 12 }}>
            سوم: ارائه از همین بخش که شما دریافت کنندگان و مقدار محصولی که میخواهید ماهانه به آتها تحویل دهید را مشخص نمایید
        </Typography> */}
        {/* <Divider sx={{ width: '50%', mx: 'auto', my: 1, borderBottomWidth: '2px' }} /> */}
        <Typography sx={{ fontSize: 12 }}>
            با زدن دکمه تغییر ظرفیت تولید👇 مقدار محصولی که می خواهید ماهانه به آنها ارائه دهید را مشخص نمایید
        </Typography>
    </Box>
}
export const iconText = `
هر کاربر می تواند تا سقف 3 کسب و کار عضو باشد 
یک کسب و کار اصلی و دو تای دیگر فرعی خواهند بود
زمانی که محصولی از دیگران دریافت می کنید این به حساب کسب و کار اصلی شما ثبت می شود 
و زمانی که درخواست محصول ایجاد می کنید دیگران با توجه به کسب و کار اصلی شما در خصوص ارئه محصول به شما تصمیم گیری خواهند کرد 
جهت جلوگیری از ایجاد سوابق سوری، تغییر کسب و کار اصلی تنها هر 14 روز امکانپذیر است

    `
export const resignationText1 = `
شما در کسب و کاری که برای استعفا از آن اقدام نموده اید تنها هستید! 
کسب و کارها قابل حذف نیستند و همیشه یک نفر عضو باید در آنها باقی بماند
برای تغییر شغل می توانید مشخصات کسب و کار خود بصورت کامل ویرایش نمایید
در صورت اصرار به استعفا باید یک نفر را استخدام نموده و مجدد به این بخش بازگردید

    `
export const resignationText2 = `
شما بعنوان نماینده کسب و کار بایستی قبل از استعفا جانشین خود را انتخاب نمایید
کدکاربری جانشین خود را که باید عضو همین کسب و کار باشد را وارد نمایید
    `
export const OthersRequestText = `
گزینه های مربوط به پاسخ تنها به کاربرانی که نماینده کسب و کار اصلی خود هستند نمایش داده می شود
همچنین اطلاعات مربوط به کسب و کار متقاضی تنها به افرادی نمایش داده می شود که صنف تعیین شده در درخواست مشتری با حداقل یکی از صنف های کسب و کارهای 
تامین کننده برابر باشد
    `
export const FirtstTabText = () => {

    return <Box sx={{ py: 1, textAlign: "center" }}>
        <Typography sx={{ mb: 1, fontSize: 12 }}>
            با زدن دکمه اعلام نیاز👇 هر چیزی که برای خودت یا کسب و کارت نیاز داری اعلام کن
        </Typography>
        <Divider sx={{ width: '50%', mx: 'auto', my: 1, borderBottomWidth: '2px' }} />
        <Typography sx={{ mb: 1, fontSize: 12 }}>
            نماینده های کسب و کارهایی که به محصولاتشون نیاز دارید درخواست شما رو می بینن و وارد صفحه کسب و کار شما میشن
        </Typography>
        <Typography sx={{ mb: 1, fontSize: 12 }}>
            اونها             عنوان شغل و مقدار و نوع محصولاتی که به دیگران ارائه می کنید را می بینند و در مورد اینکه بعنوان دریافت کننده محصول آنها انتخاب شوید تصمیم می گیرند
        </Typography>
            </Box>
}

export const createBusiness_selectAsPrimary = () => {

    return <Box sx={{ py: 1, textAlign: "center" }}>
        <Typography>
            داشتن چند شغل و عضویت در چند کسب و کار مختلف تا سقف 3 عدد مجاز است اما محصولاتی که دریافت می کنید به حساب کسب و کار اصلی شما منظور می شود
        </Typography>
        <Typography>
            تغییر کسب و کار اصلی تنها هر 14 روز یکبار امکانپذیر است
        </Typography>
    </Box>
}
export const AllBusinessesText = () => {

    return <Box sx={{ py: 1, textAlign: "center" }}>
        <Typography sx={{ fontSize: 14 }}>
            برای نمایش کسب و کارها بر اساس فاصله بایستی اجازه دسترسی به GPS را تایید نمایید
        </Typography>
        <Typography sx={{ fontSize: 14 }}>
            توجه داشته باشید موقعیت مکانی که در این صفحه مشخص می کنید جایی ذخیره نمی شود و برای محاسبه و نمایش نزدیکترین کسب و کارها در همین صفحه کاربرد دارد
        </Typography>
    </Box>
}


