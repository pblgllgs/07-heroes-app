import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { PrivateRoute } from '../../routers/PrivateRoute';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Saliendo de aqui</span>,
}));

describe('pruebas en <PrivateRoute />', () => {
    Storage.prototype.setItem = jest.fn();

    test('debe de mostrar el componente si esta autenticado y guardar en el localstorage', () => {
        const contextValue = {
            user: {
                name: 'Pablo',
                logged: true,
            },
        };
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(wrapper.text()).toBe('Private Component');
        expect(localStorage.setItem).toHaveBeenLastCalledWith('lastPath', '/');
    });

    test('debe de bloquear el componente si no esta authenticado', () => {
        const contextValue = {
            user: {
                logged: false,
            },
        };
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(wrapper.text()).toBe('Saliendo de aqui');
    });
});
