import TourDetails from '@/components/organisms/tours/tourDetail'
import React from 'react'
import TourLayout from '../layout'

function TourDetailPage() {
  return (
    <TourLayout isLayoutApplied={false}>
      <TourDetails />
    </TourLayout>
  )
}

export default TourDetailPage
