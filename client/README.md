### Delicon
It’s a B2B application.

### For Development: 
1. Open the project in your favourite IDE 
2. Install the dependencies.
`yarn install` `npm install `
3. Use one of the following commnds to run:
 `yarn start` `npm start `

### Folder Structure:
```
│   App.css
│   App.js
│   index.js
│
├───assets
│   ├───img
│   │       billing.jpg
│   │       feedback.jpg
│   │       logo.png
│   │       menu.jpg
│   │       reservation.jpg
│   │       service.jpg
│   │       valet.jpg
│   │       walkin.jpg
│   │
│   └───svg
│           businessman.svg
│
├───components
│   │   ItemCard.js
│   │   Navbar.js
│   │
│   └───errorBoundry
│           errorBoundry.js
│           errorBoundry.styles.js
│
├───pages
│   │   login.js
│   │   signup.js
│   │
│   ├───owner
│   │       billAnalytics.js
│   │       businessDetails.js
│   │       businesses.js
│   │       feedBack.js
│   │       feedbackslist.js
│   │       menu.js
│   │       menuAnalytics.js
│   │       menuItems.js
│   │       ordersAnalytics.js
│   │       ownerDashboard.js
│   │       reqbusiness.js
│   │       reservationAnalytics.js
│   │       service.js
│   │       serviceAnalytics.js
│   │       serviceItem.js
│   │       staffs.js
│   │       valetAnalytics.js
│   │       walkinAnalytics.js
│   │
│   └───staff
│           billList.js
│           billMain.js
│           feedbackform.css
│           feedBackForm.js
│           orderCustomer.js
│           orders.js
│           orderSummery.js
│           reservations.js
│           staffDashboard.js
│           staffMenuItems.js
│           staffMenuService.js
│           staffServiceItems.js
│           valets.js
│           walkins.js
│
├───redux
│   │   store.js
│   │   types.js
│   │
│   ├───actions
│   │       dataActions.js
│   │       uiActions.js
│   │       userActions.js
│   │
│   └───reducers
│           dataReducer.js
│           uiReducer.js
│           userReducer.js
│
└───utils
        history.js
        Validate.js

```


### Technologies Used:
Reactjs, Material UI, styled-components, bootstrap, react-icons, axios, redux.

### Explanation:
1. Owner folder contain files for businessowner and it also contain analytics files.
2. Staff folder contain files for staff. 
3. Redux is used with REDUX_DEVTOOLS_EXTENSION.
4. Util folder contain form validation.
5. Axios is for API Integration.

### Login ID:
1. BusinessOwner – pranav@gmail.com 123456
2. Staff – pg123@gmail.com 123456