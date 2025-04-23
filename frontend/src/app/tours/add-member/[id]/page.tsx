import React from 'react'
import TourLayout from '../../layout'
import AddMember from '@/components/organisms/tours/addMember'
import BackButton from '@/components/atoms/back-buton'

const AddMemberPage = () => {
    return (
        <TourLayout title="Manage Members" isLayoutApplied={true} backButton={
            <BackButton classname="bg-white" />
        }>
            <div className="flex-1">
                <AddMember />
            </div>
        </TourLayout>
    )
}

export default AddMemberPage
