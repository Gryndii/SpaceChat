//Core
import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

export const withMaterialUiTheme = (theme) => (WrappedComponent) => {
    class WithMaterialUiTheme extends Component {
        theme = createMuiTheme(theme);

        render() {
            return (
                <MuiThemeProvider theme = { this.theme }>
                    <WrappedComponent/>
                </MuiThemeProvider>
            );
        }
    }

    const getDisplayName = (WrappedComponent) => {
        return WrappedComponent.displayName || WrappedComponent.name || 'Component';
    };

    WithMaterialUiTheme.displayName = `WithMaterialUiTheme(${getDisplayName(WrappedComponent)})`;

    return WithMaterialUiTheme;
};
