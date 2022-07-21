export interface Global {
  error: Error;
}

export interface Error {
  old_password_not_valid: string;
  sorry_there_was_problem: string;
  you_check_parameters: string;
  email_already_exists: string;
  password_password_not_match: string;
  no_user_found_email: string;
  user_not_found: string;
  session_expired: string;
  invalid_password: string;
  code_has_expired_new_code: string;
  user_already_confirmed: string;
  wrong_password_or_email: string;
  book: Book;
  dont_delete_file: string;
  review: Review;
}

export interface Review {
  dont_change: string;
}

export interface Book {
  error_when_interaction_genre_adding: string;
  book_not_found: string;
  book_genre_exists: string;
  book_already_exists: string;
  book_contribute_exists: string;
  you_must_add_contribute: string;
  you_must_check_contributes: string;
  dont_read_book: string;
}