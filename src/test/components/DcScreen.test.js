import { shallow } from "enzyme";
import { DcScreen } from "../../components/dc/DcScreen"


describe('pruebas en <DcScreen />', () => {
    test('comparar contra el snapshoot', () => {
        const wrapper = shallow(<DcScreen />)
        expect(wrapper).toMatchSnapshot();
    })
    
})
