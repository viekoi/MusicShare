"use client";

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { 
  useSessionContext, 
  useSupabaseClient
} from '@supabase/auth-helpers-react';


import useAuthModal from "@/hooks/useAuthModal";

import Modal from './Modal';

const AuthModal = () => {
  const { session } = useSessionContext();

  const { onClose, isOpen } = useAuthModal();
  
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (session) {
      onClose();
      
    }
  }, [session, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  return (
    <Modal 
      title="Welcome back" 
      description="Đăng nhập vào tài khoản của bạn." 
      isOpen={isOpen} 
      onChange={onChange} 
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={[]}    
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e'
              }
            }
          }
        }}

        localization={{
          variables: {
            sign_in: {
              email_label: 'Email của bạn',
              password_label: 'Mật khẩu',
              email_input_placeholder:'Nhập Email',
              password_input_placeholder:'Nhập mật khẩu',
              button_label:'Đăng nhập',  
              link_text:'Đã có tài khoản? Đăng nhập',
            },
            forgotten_password:{
              link_text:'Quên mật khẩu?',
              email_label: 'Email của bạn',
              email_input_placeholder:'Nhập Email',
              button_label:'Gửi hướng dẫn lấy lại mật khẩu'
            },
            sign_up:{
              link_text:'Chưa có tài khoản? Đăng ký',
              email_label: 'Email của bạn',
              password_label: 'Mật khẩu',
              email_input_placeholder:'Nhập Email',
              password_input_placeholder:'Nhập mật khẩu',
              button_label:'Đăng ký'
            }
          },
        }}
        theme="dark"
      />
    </Modal>
  );
}

export default AuthModal;