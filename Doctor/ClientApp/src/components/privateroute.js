import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, roles, ...rest }) {
    
    return (
        <Route {...rest} render={props => {
            console.log({...props});
       //     console.log(JSON.parse(localStorage.getItem('currentUser')).role );
            if (!localStorage.getItem('currentUser')) {
                console.log('NOT LOGGED IN');
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }else {
                console.log('LOGGED IN');
                
                return <Component {...props} />
              
            }

            // logged in so return component
        }} />
    );
}

export { PrivateRoute };