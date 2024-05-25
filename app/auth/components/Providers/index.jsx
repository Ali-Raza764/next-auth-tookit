import { providerMap } from "@/auth";
import React from "react";
import ProviderButton from "./ProviderButton";

const Providers = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      {providerMap.map((provider) => {
        return (
          provider.id != "credentials" && (
            <ProviderButton
              id={provider.id}
              key={provider.id}
              name={provider.name}
            />
          )
        );
      })}
    </div>
  );
};

export default Providers;
