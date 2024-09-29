import React from "react";
import Swal from "sweetalert2";
import { useAuthContext } from "../contexts/auth.context";
import { useProduct } from "../contexts/financial.context";
import { Link } from "react-router-dom";

const Card = ({ id, imageUrl, name, brand, price, category }) => {
  const { user } = useAuthContext();
  const { deleteProduct } = useProduct();

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you absolutely sure?",
      text: "This action is irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545", 
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(id);
          Swal.fire("Success!", `Product with id=${id} has been successfully removed.`, "success");
        } catch (err) {
          Swal.fire("Failed!", `Couldn't delete product: ${err.message}`, "error");
        }
      }
    });
  };

  const handleBuy = () => {
    if (!user || !user.address) {
      Swal.fire({
        title: "Address not found",
        text: "Please update your profile with an address before making a purchase.",
        icon: "warning",
        confirmButtonText: "Update Profile",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/profile";
        }
      });
    } else {
      Swal.fire("Purchase Successful!", "Your order has been placed successfully.", "success");
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <Link to={`/product/${id}`}>
        <figure>
          <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>Brand: {brand}</p>
          <p>Price: ${price}</p>
          <p>Category: {category}</p>
        </div>
      </Link>
      <div className="card-actions justify-end">
        {user &&
          (user.roles.includes("ROLES_MODERATOR") || user.roles.includes("ROLE_ADMIN")) && (
            <>
              {user.roles.includes("ROLE_ADMIN") && (
                <button
                  className="btn btn-outline btn-error"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(id);
                  }}
                >
                  Remove
                </button>
              )}
              <Link to={`/edit/${id}`} className="btn btn-outline btn-warning">
                Modify
              </Link>
            </>
          )}
        {user && !user.roles.includes("ROLE_ADMIN") && (
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              handleBuy();
            }}
          >
            Purchase
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
