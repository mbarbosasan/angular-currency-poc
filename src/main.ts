import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideCustomNgxCurrencyEnvironment } from './mottu-ngx-currency-environment-provider';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideCustomNgxCurrencyEnvironment()],
}).catch((err) => console.error(err));
