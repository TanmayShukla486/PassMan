declare module 'myTypes' {
  type Password = {
    email: string;
    username: string;
    password: string;
    website: string;
  };
  interface PasswordProps {
    password: Password;
  }
  interface PasswordListProps {
    list: Password[];
  }
  interface NavBarProps {
    loggedIn: boolean;
  }
}

module.exports = { Password, PasswordProps, PasswordListProps };
