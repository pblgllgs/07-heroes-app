import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

//creamos un action, le pasamos un estado y comparamos

describe("Pruebas en <AuthReducer />", () => {
    test("debe retornar el estado por defecto", () => {
        //comparamos el state por defecto con un estado logged false
        const state = authReducer({ logged: false }, {});
        //esperamos el sgte. resulatdo
        expect(state).toEqual({ logged: false });
    });

    test("debe de autenticar y colocar el name del usuario", () => {
        //creamos un action
        const action = {
            type: types.login,
            payload: {
                name: "pablo",
            },
        };
        //con el action y un estado vemos el comportamiento del reducer
        const state = authReducer({ logged: false }, action);

        //esperamos que se cambie el estado por defecto a logged true con un name 
        expect(state).toEqual({
            logged: true,
            name: "pablo",
        });
    });

    test("debe de borrar el name del usuario y logged en false", () => {
        //creamos un action
        const action = {
            type: types.logout,
        };
        //con el action y un estado vemos el comportamiento del reducer
        const state = authReducer({ logged: true, name: "pablo" }, action);
        //esperamos que se cambie el estado por defecto a logged false y no tengamos nombre
        expect(state).toEqual({
            logged: false,
        });
    });
});
