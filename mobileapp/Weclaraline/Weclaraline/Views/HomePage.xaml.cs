﻿using System;
using System.Collections.Generic;
using Plugin.GoogleClient;
using Weclaraline.Models;
using Xamarin.Forms;

namespace Weclaraline.Views
{
    public partial class HomePage : ContentPage
    {
    

        public HomePage(NetworkAuthData networkAuthData)
        {
            BindingContext = networkAuthData;
            InitializeComponent();
        }

        async void OnLogout(object sender, System.EventArgs e)
        {
            if (BindingContext is NetworkAuthData data)
            {
                switch (data.Name)
                {
                    
                    case "Google":
                        CrossGoogleClient.Current.Logout();
                        break;
                }

                await Navigation.PopModalAsync();
            }
        }
    }
}
