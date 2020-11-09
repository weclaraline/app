using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using Weclaraline.Services;
using Weclaraline.Views;

namespace Weclaraline
{
    public partial class App : Application
    {

        public App(IOAuth2Service oAuth2Service)
        {
            InitializeComponent();

            DependencyService.Register<MockDataStore>();
            MainPage = new LoginPage(oAuth2Service);
        }

        protected override void OnStart()
        {
        }

        protected override void OnSleep()
        {
        }

        protected override void OnResume()
        {
        }
    }
}
