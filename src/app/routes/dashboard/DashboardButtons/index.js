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
    constructor(props) {
        super(props);
        this.state = {};
        this.facilityButtonsActive = [];
    }

    componentWillReceiveProps(nextProps) {
        if (
            isEqual(
                this.props.facilityFilter.flagFilter,
                nextProps.facilityFilter.flagFilter
            )
        ) {
            this.facilityButtonsActive = nextProps.facilityActive.activeFacilityArray;
        }
    }

    activeButtons = (item, flag) => {
        let newArrayActive = [];
        if (flag) {
            this.facilityButtonsActive.push(item);
        } else {
            newArrayActive = this.facilityButtonsActive.filter(btn => {
                return btn.name !== item.name;
            });

            this.facilityButtonsActive = newArrayActive;
        }

        this.props.activeFacilityArray(this.facilityButtonsActive);
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
                        facilityButtonsActive={this.facilityButtonsActive}
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
                        facilityButtonsActive={this.facilityButtonsActive}
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
