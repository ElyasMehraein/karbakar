import Header from "@/components/common/Header";
import MyAppBar from "@/components/common/MyAppBar";

export default function RootLayout({ children }) {
    return (
        <>
            <MyAppBar>
                <Header>

                    {children}

                </Header>
            </MyAppBar>
        </>

    );
}