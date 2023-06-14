'use client'
import React from 'react'

import Modal from './Modal'
import useMobilePlayerModal from '@/hooks/useMobilePlayerModal'


const MobilePlayerModal = () => {
  const mobilePlayerModal = useMobilePlayerModal()

  const onChange = (open: boolean) => {
    if (!open) {
      mobilePlayerModal.onClose();
    }
  };
  return (
    <Modal isOpen={mobilePlayerModal.isOpen} title='abc' description='abc' onChange={onChange} >

    </Modal>
  )
}

export default MobilePlayerModal