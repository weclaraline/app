using System;
using System.Collections.Generic;
using Weclaraline.Services;
using Weclaraline.ViewModels;
using Xamarin.Forms;

namespace Weclaraline.Views
{
    public partial class LoginPage : ContentPage
    {
        public LoginPage()
        {
            InitializeComponent();
        }

        public LoginPage(IOAuth2Service oAuth2Service)
        {
            InitializeComponent();
            this.BindingContext = new LoginViewModel(oAuth2Service);
        }
    }
}
