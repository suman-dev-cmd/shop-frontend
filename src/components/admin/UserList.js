import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allusers, deleteUser, clearErrors } from '../../actions/userAction'
import { DELETE_USER_RESET } from '../../constants/userConstant'
const UserList = ({history}) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {user,loading,error} = useSelector(state=>state.allUser);
    const { isDeleted } = useSelector(state => state.user)
    console.log(user);
    useEffect(() => {
        dispatch(allusers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('User deleted successfully');
            history.push('/admin/users');
            dispatch({ type: DELETE_USER_RESET })
        }

    }, [dispatch, alert, error, isDeleted, history])
    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }
    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        if(user){
            user.forEach(users => {
                data.rows.push({
                    id: users._id,
                    name: users.name,
                    email: users.email,
                    role: users.role,
    
                    actions: <Fragment>
                        <Link to={`/admin/user/${users._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(users._id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                })
            })
    
            return data;
        }
     
    }


    return (
        <Fragment>
            <MetaData title={'All Orders'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Orders</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setUsers()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default UserList
