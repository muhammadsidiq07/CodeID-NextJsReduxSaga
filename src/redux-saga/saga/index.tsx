import { takeEvery, all } from 'redux-saga/effects'
import * as ActionTypeRegion from '../constant/regionCostant'
import { handleAddRegion, handleDelRegion, handleEditRegion, handleFindRegion, handleGetRegion } from './RegionSaga'

function* watchAll(){
    yield all([
        takeEvery(ActionTypeRegion.GET_DATA_REQUEST, handleGetRegion),
        takeEvery(ActionTypeRegion.ADD_DATA_REQUEST, handleAddRegion),
        takeEvery(ActionTypeRegion.EDIT_DATA_REQUEST, handleEditRegion),
        takeEvery(ActionTypeRegion.DEL_DATA_REQUEST, handleDelRegion),
        takeEvery(ActionTypeRegion.FIND_DATA_REQUEST, handleFindRegion)
    ])
}

export default watchAll