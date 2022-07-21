export interface Email {
  login_page: string;
  username: string;
  thanks: string;
  team_and_company: string;
  url_browser: string;
  welcome: Welcome;
  password_reset: Passwordreset;
  password_reset_confirm: Passwordresetconfirm;
}

export interface Passwordresetconfirm {
  title: string;
  error: string;
  description: string;
  description2: string;
  action_button: string;
  bottom: string;
}

export interface Passwordreset {
  title: string;
  error: string;
  description: string;
  action_button: string;
  bottom: string;
}

export interface Welcome {
  title: string;
  description: string;
  action_button: string;
  for_reference_infarmation: string;
  support: string;
}