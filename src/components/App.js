import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';

class App extends Component {
    render() {
        return (<div><FormattedMessage id="test" defaultMessage="Testing" /></div>)
    }
}

export default App