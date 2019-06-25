import { InjectionToken } from '@angular/core';

export interface ApplicationConfig {
    atlantisApp: any;
    mobileApiEndpoint: string;
}

export const MY_CONFIG = {
    atlantisApp: {
        client_id: "27fb84fe-4baf-4b6b-bfe7-f2d0638f2790",
        //client_secret: "Zg2^04#WjA#h%6Q{]eK53J&`",
        client_secret: "Zg2%5E04%23WjA%23h%256Q%7B%5DeK53J%26%60",
        oauthBaseEndpoint: "https://atlantisproject.b2clogin.com/atlantisproject.onmicrosoft.com/oauth2/v2.0",
        oauthBaseEndpointMainParam: {
            paramName: "p",
            paramValue: "b2c_1_signuporsignin"
        },
        oauthRedirectEndpoint: "http://localhost/"
    },
    mobileApiEndpoint: "http://localhost:7001/AtlantisJEE/api/mobile"
};

export const MY_CONFIG_TOKEN = new InjectionToken<ApplicationConfig>('config');