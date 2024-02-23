import MyAppBar from '@/components/createBusiness/MyAppBar'
import BusinessHeader from '@/components/createBusiness/BusinessHeader'
import BusinessAvatar from '@/components/createBusiness/BusinessAvatar'
import BioEdit from '@/components/common/BioEdit'
import Guild from '@/components/common/Guild'
import ExplainEdit from '@/components/common/ExplainEdit'
import CountactEdit from '@/components/common/CountactEdit'
import MakePrimary from '@/components/createBusiness/MakePrimary'
import EmploeeListEdit from '@/components/createBusiness/EmploeeListEdit'
import AddressEdit from '@/components/createBusiness/AddressEdit'
import WhatBusinessGet from '@/components/createBusiness/WhatBusinessGet'
import NameEdit from '@/components/common/NameEdit'

export default function createBusiness() {

    return (
        < >
            <MyAppBar />
            <BusinessHeader />
            <BusinessAvatar />
            <NameEdit defaultValue={"کسب و کار"} label={"نام کسب و کار شما"}/>
            <NameEdit defaultValue={"بنیانگذار"} label={"سمت و مسئولیت شما در این کسب و کار"}/>
            <AddressEdit defaultValue={"کسب و کار"} label={"آدرس محل کسب و کار شما"}/>
            <Guild/>
            <BioEdit/>
            <ExplainEdit/>
            <MakePrimary/>
            <CountactEdit />
            <EmploeeListEdit/>
        </>
    )

}
