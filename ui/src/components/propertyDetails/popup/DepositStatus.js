import Popup from "reactjs-popup";
import PopupOverlay from "../../PopupOverlay";
import BlockchainUtils from "../../../blockchain/utils/blockchainUtils";
import Swal from "sweetalert2";
import { useContext } from "react";
import { ListingsContext } from "../../../context/Listings/ListingsContextProvider";
import successAlert from "../../alerts/successAlert";

export default function DepositStatus({ house, user }) {
  const { updateListing } = useContext(ListingsContext);

  /** Withdraw the deposit back to buyer*/
  async function onWithdrawDeposit() {
    Swal.fire({
      title: "Are you sure?",
      // html: "you don't have to pay any fee, just a little gas for your transaction.",
      showConfirmButton: true,
      showCancelButton: true,
      timer: 15000,
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      // Setup utils
      var utils = new BlockchainUtils();
      var account = await utils.getCurrentAccount();
      utils.account = account;

      // Withdraw the money
      var success = await utils.transfer(
        house._id,
        house.depositBy,
        house.depositAddress
      );

      if (success) {
        var response = await updateListing({
          id: house._id,
          data: {
            depositStatus: null,
            depositBy: null,
            depositAmount: null,
            depositCreatedAt: null,
            depositAddress: null,
          },
        });

        if (response.success) {
          successAlert("Withdrawal completed.");
        }
      }

      window.location.href("http://localhost:3000/me");
    });
  }

  return (
    house != null && (
      <Popup
        modal
        trigger={
          <div className="bg-violet-700 hover:bg-violet-800 font-bold text-white rounded p-4 text-sm w-full transition cursor-pointer">
            Check your deposit status
          </div>
        }
      >
        {(close) => (
          <PopupOverlay close={close} width="w-1/4" height="h-2/5">
            <div className="relative h-full">
              <div>
                <div className="mb-5 ">
                  <div className="block uppercase font-bold tracking-wide text-gray-700 text-xs">
                    Deposit status
                  </div>
                  <div>{house.depositStatus}</div>
                </div>
                <div className="mb-">
                  <div className="block uppercase font-bold tracking-wide text-gray-700 text-xs ">
                    Deposit amount
                  </div>
                  <div>{house.depositAmount}</div>
                </div>
              </div>
              <div className="absolute flex gap-2 bottom-0 right-0">
                {house.depositStatus === "Pending" && (
                  <div
                    className="border border-violet-700 font-bold text-violet-700 rounded p-4 text-sm w-fit transition cursor-pointer"
                    onClick={onWithdrawDeposit}
                  >
                    Withdraw deposit
                  </div>
                )}
                <div
                  onClick={close}
                  className="bg-violet-700 hover:bg-violet-800 font-bold text-white rounded p-4 text-sm w-fit transition cursor-pointer"
                >
                  Close
                </div>
              </div>
            </div>
          </PopupOverlay>
        )}
      </Popup>
    )
  );
}
