qx.Class.define("ugpa.periodpicker.PickerWithButton", {
    extend : qx.ui.container.Composite,

    construct() {
        // noinspection JSAnnotator
        super(new qx.ui.layout.HBox());
        this._createChildControl("picker");
        this._createChildControl("button");
    },

    properties: {
        period: {
            init: {},
            event: "changePeriod"
        }
    },

    members: {
        _createChildControlImpl(id, hash) {
            let control;
            
            switch (id) {
                case "picker":
                    control = new ugpa.periodpicker.Picker();
                    control.addListener("changePeriod", this._onPicker, this);
                    this._add(control);
                    break;
                case "button":
                    control = new ugpa.periodpicker.Button();
                    control.addListener("changePeriod", this._onButton, this);
                    this._add(control);
                    break;
            }

            return control || super._createChildControlImpl(id, hash);
        },

        _onPeriodChanged(period) {
            this.setPeriod({from: period.getStart(), to: period.getEnd()});
        },

        _onPicker() {
            this.getChildControl("button").resetLabel();
            const period = this.getChildControl("picker").getValue();
            this._onPeriodChanged(period);
        },

        _onButton(e) {
            const period = e.getData();
            this.getChildControl("picker").setValue(period);
            this._onPeriodChanged(period);
        }
    }
});
