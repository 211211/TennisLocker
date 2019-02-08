import React from 'react';
import './dashboardButtons.scss';
import isEqual from 'lodash/isEqual';
import FilterBtn from './FilterBtn';
import { connect } from 'react-redux';
import { activeFacilityArray } from '../../../../actions/Facility';

const mapStateToProps = ({ facility, facilityActive, facilityFilter }) => ({
    facility,
    facilityActive,
    facilityFilter
});

class DashboardButtons extends React.Component {
    activeButtons = (item, flag) => {
        
        const {facilityActive: {activeFacilityArray}} = this.props
        let newArrayActive
        if (flag) {
            newArrayActive = [...activeFacilityArray];
            newArrayActive.push(item);
        } else {
            newArrayActive = activeFacilityArray.filter(btn => btn.name !== item.name);
        }

        this.props.activeFacilityArray(newArrayActive);
    };

    buildTopArrayButtons = () => {
        const buttons = this.props.facilityBtn;
        if (buttons === undefined) {
            return [];
        }

        if (!Array.isArray(buttons)) {
            return [];
        }

        if (buttons.length === 0) {
            return [];
        }

        return buttons
            .filter(button => !button.isHidden && button.placement !== 'bottom')
            .map(item => {
                return (
                    <FilterBtn
                        key={item.name}
                        item={item}
                        facilityButtonsActive={this.props.facilityActive.activeFacilityArray}
                        activeButtons={this.activeButtons}
                    />
                );
            });
    };

    buildBottomArrayButtons = () => {
        const buttons = this.props.facilityBtn;
        if (buttons === undefined) {
            return [];
        }

        if (!Array.isArray(buttons)) {
            return [];
        }

        if (buttons.length === 0) {
            return [];
        }

        return buttons
            .filter(button => !button.isHidden && button.placement === 'bottom')
            .map(item => {
                return (
                    <FilterBtn
                        key={item.name}
                        item={item}
                        facilityButtonsActive={this.props.facilityActive.activeFacilityArray}
                        activeButtons={this.activeButtons}
                    />
                );
            });
    };

    render() {
        return (
            <React.Fragment>
                <div className="dashboard_top_block">
                    {[...this.buildTopArrayButtons()]}
                </div>
                <p className="features_title">Features</p>
                <div className="dashboard_bottom_block">
                    {[...this.buildBottomArrayButtons()]}
                </div>
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    {
        activeFacilityArray: payload => activeFacilityArray(payload)
    }
)(DashboardButtons);
