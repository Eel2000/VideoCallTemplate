using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace VideoCallTemplate.Pages
{
    public partial class Index : ComponentBase
    {
        [Inject]
        public IJSRuntime? jSRuntime { get; set; }

        private bool IsInCall = false;

        string icon = MudBlazor.Icons.Filled.Call;
        MudBlazor.Color Color = MudBlazor.Color.Success;

        protected override void OnInitialized()
        {
            base.OnInitialized();

        }

        private async void Call()
        {
            IsInCall = !IsInCall;
            icon = IsInCall ? MudBlazor.Icons.Filled.CallEnd : MudBlazor.Icons.Filled.Call;
            Color = IsInCall ? MudBlazor.Color.Error : MudBlazor.Color.Success;
            if (IsInCall)
            {
                await jSRuntime!.InvokeVoidAsync("openCam");
                //var data = await jSRuntime.InvokeAsync<string>("processStream");
            }
        }
    }
}
