import React, { FC, useState } from 'react';
import { RouterProvider } from "react-router-dom";

// Components
import Counter from './component/Counter/Counter';
import Routes from './routes/Routes';
import Button from './component/Button/Button';

const App: FC = () => {
  // Local State 
  const [view, setView] = useState<"userList" | "counter">("userList")

  const navigateOptionDisplay = () => {
    const navigateUserListPropsContainer: buttonProps = {
      buttonStyle: view === "userList" ? "dark" : "light",
      buttonTitle: "User List Display",
      buttonAction: () => setView("userList")
    }

    const navigateOperationPropsContainer: buttonProps = {
      buttonStyle: view === "counter" ? "dark" : "light",
      buttonTitle: "Decrement Increment Operation",
      buttonAction: () => setView("counter")
    }

    return (
      <div className="fixed bottom-0 right-0 flex flex-row gap-10 bg-white shadow-lg m-10 p-5 rounded-lg">
        <Button {...navigateUserListPropsContainer} />
        <Button {...navigateOperationPropsContainer} />
      </div>
    )
  }

  // View Counter Operation (if view is set to Decrement Increment Operation)
  const counterDisplay = () => {
    return view === "counter" ? (
      <div className='flex flex-row items-center justify-center'>
        <Counter element={"firstCounter"} />
        <Counter element={"secondCounter"} />
      </div>
    ) : null
  }

    // View User List Operation (if view is set to User List)
  const userListDisplay = () => {
    return view === "userList" ? (
      <div>
        <RouterProvider router={Routes} />
      </div>
    ) : null
  }

  return (
    <div className="app relative">
      {counterDisplay()}
      {userListDisplay()}
      {navigateOptionDisplay()}
    </div>
  );
}

export default App;
