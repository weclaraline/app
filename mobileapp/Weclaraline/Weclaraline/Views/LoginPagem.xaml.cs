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
            this.BindingContext = new LoginViewModel();
        }
    }
}
