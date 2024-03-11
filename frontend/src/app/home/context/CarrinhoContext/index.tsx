import { createContext, ReactNode, useReducer, useMemo } from "react";
import { CarrinhoState } from "./types";
import CarrinhoService from "./service";
import carrinhoStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";

interface CarrinhoContextProps {
  state: CarrinhoState;
  prevState?: CarrinhoState;
  service: CarrinhoService;
}

export const CarrinhoContext = createContext<CarrinhoContextProps>(
  {} as CarrinhoContextProps
);

interface CarrinhoProviderProps {
  children: ReactNode;
}

export const CarrinhoProvider = ({ children }: CarrinhoProviderProps) => {
  const [state, dispatch] = useReducer(carrinhoStateReducer, {
    getCarrinhoRequestStatus: RequestStatus.idle(),
    updateCarrinhoRequestStatus: RequestStatus.idle(),
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);
  const service = useMemo(
    () =>
      new CarrinhoService({
        apiService,
        dispatch,
      }),
    [apiService]
  );

  return (
    <CarrinhoContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};