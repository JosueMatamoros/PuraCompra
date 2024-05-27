import React, { useState } from "react";
import { Button } from "flowbite-react";
import { IoCard } from "react-icons/io5";
import { RiBankFill } from "react-icons/ri";
import CreditCardForm from "./CreditCardForm";
import BankAccount from "./BankAccount";

export default function PaymentDetails() {
  const [selectedMethod, setSelectedMethod] = useState("card"); // Estado para manejar la selección

  return (
    <div className="flex flex-col items-center w-full">
      <Button.Group className="mb-8">
        <Button
          color="gray"
          className={`flex items-center ${
            selectedMethod === "card" ? "border-2 border-blue-500" : ""
          }`}
          onClick={() => setSelectedMethod("card")} // Actualiza el estado al hacer clic
        >
          <IoCard className="mr-3 h-4 w-4" />
          Card
        </Button>
        <Button
          color="gray"
          className={`flex items-center ${
            selectedMethod === "bank" ? "border-2 border-blue-500" : ""
          }`}
          onClick={() => setSelectedMethod("bank")} // Actualiza el estado al hacer clic
        >
          <RiBankFill className="mr-3 h-4 w-4" />
          Bank Account
        </Button>
      </Button.Group>
      <div className="max-w-1/2 h-96"> {/* Contenedor con altura fija */}
        {selectedMethod === "card" && <CreditCardForm />}
        {selectedMethod === "bank" && <BankAccount />}
      </div>
    </div>
  );
}
