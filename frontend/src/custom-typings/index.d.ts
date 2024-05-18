declare module 'myTypes' {
  type Password = {
    email: string;
    username: string;
    password: string;
    website: string;
    _id: string;
  };
  type User = {
    email: string;
    username: string;
    authToken: string;
  };
  interface PasswordProps {
    password: Password;
    listRemove: (id: string) => void;
  }
  interface PasswordListProps {
    list: Password[];
    setList: React.Dispatch<React.SetStateAction<Password[]>>;
  }
  interface NavBarProps {
    loggedIn: boolean;
  }
}

module.exports = { User, Password, PasswordProps, PasswordListProps };
