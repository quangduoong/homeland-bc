import { Menu } from "@headlessui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../assets/img/logo.svg";
import BlockchainUtils from "../blockchain/utils/blockchainUtils";
import { AuthContext } from "../context/Auth/AuthContextProvider";
import successAlert from "./alerts/successAlert";

const Header = () => {
  const {
    authState: { isAuthenticated, user },
    logOut,
    updateUser,
  } = useContext(AuthContext);

  const handleOnLogOut = async () => {
    const result = await logOut();
    if (result.isConfirmed) {
      window.location.href = "/";
    }
  };

  async function updateEthAddress(close) {
    var utils = new BlockchainUtils();
    var account = await utils.getCurrentAccount();

    Swal.fire({
      title: "Check your MetaMask Address",
      showConfirmButton: true,
      showCancelButton: true,
      html: `Old address: ${user.ethAddress}<br>New address: ${account}`,
      timer: 15000,
    })
      .then(async (result) => {
        if (!result.isConfirmed) return;

        await updateUser({ ethAddress: account });
        await successAlert("Upated ETH Address!");
        window.location.reload();
      })
      .finally(() => close());
  }

  return (
    <header className="sticky top-0 z-40 py-3 mb-12 border-b bg-white  ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
        <div className="flex items-center gap-6">
          <Link
            className="hover:text-violet-900 transition"
            to="/create-listing"
          >
            Create listing
          </Link>
          <Link className="hover:text-violet-900 transition" to="/forum">
            Forum
          </Link>
          <span className="w-0.5 h-5 bg-gray-200"></span>
          {isAuthenticated ? (
            <Menu as="div" className="relative">
              <Menu.Button>{user?.name}</Menu.Button>
              <Menu.Items className="absolute right-0 mt-1 bg-gray-200 rounded w-[200px] p-2 text-right">
                <Menu.Item as="div">
                  {({ active, close }) => (
                    <div className="hover:bg-gray-300 rounded p-1 ">
                      <Link to="/me" onClick={close}>
                        Your profile
                      </Link>
                    </div>
                  )}
                </Menu.Item>
                <div className="my-1 bg-gray-50">
                  {user?.ethAddress && (
                    <Menu.Item as="div">
                      {({ active, close }) => (
                        <div className="text-xs text-slate-700 rounded p-1 cursor-pointer truncate ...">
                          <div>ETH Address: {user.ethAddress}</div>
                        </div>
                      )}
                    </Menu.Item>
                  )}
                  <Menu.Item as="div">
                    {({ active, close }) => (
                      <div className="hover:bg-gray-300 rounded p-1 cursor-pointer">
                        <div onClick={() => updateEthAddress(close)}>
                          Update ETH address
                        </div>
                      </div>
                    )}
                  </Menu.Item>
                </div>

                <Menu.Item as="div">
                  {(active) => (
                    <div
                      className="hover:bg-gray-300 rounded p-1 cursor-pointer"
                      onClick={handleOnLogOut}
                    >
                      Log out
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link className="hover:text-violet-900 transition" to="/signin">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
