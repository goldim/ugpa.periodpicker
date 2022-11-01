qx.Class.define("ugpa.periodpicker.Picker", {
    extend : qx.ui.container.Composite,

    construct() {
        // noinspection JSAnnotator
        super(new qx.ui.layout.HBox());
        this._createChildControl("start");
        this.__createAndAddDtSeparator();
        this._createChildControl("end");
    },

    events: {
        "changePeriod": "qx.event.type.Data"
    },

    properties: {
        valid: {
            init: true,
            check: "Boolean",
            apply: "_applyValid"
        }
    },

    members: {
        _applyValid(value) {
            this.getChildControl("start").setValid(value);
            this.getChildControl("end").setValid(value);
        },

        _createChildControlImpl(id, hash) {
            let control;
            
            switch (id) {
                case "start":
                case "end":
                    control = new ugpa.periodpicker.DateTimeField();
                    control.addListener("changePeriod", this._onChangePeriod, this);
                    this._add(control);
                    break;
            }

            switch (id) {
                case "start":
                    control.addListener("changePeriod", this._onStartChange, this);
                    break;
                case "end":
                    control.addListener("changePeriod", this._onEndChange, this);
                    break;
            }
            return control || super._createChildControlImpl(id, hash);
        },

        _onStartChange() {
            const dt = this.getChildControl("end");
            const value = this.getChildControl("start").getValue();
            dt.setMinDate(value);
        },

        _onEndChange() {
            const dt = this.getChildControl("start");
            const value = this.getChildControl("end").getValue();
            dt.setMaxDate(value);
        },

        _onChangePeriod() {
            const period = this.getValue();
            const valid = period.isValid();
            this.setValid(valid);

            if (valid) {
                this.fireDataEvent("changePeriod", period);
            }
        },

        getValue() {
            const from = this.getChildControl("start").getValue();
            const to = this.getChildControl("end").getValue();
            return new ugpa.periodpicker.Period(from, to);
        },

        setValue(period) {
            this.__stopListeningChanges();
            this.getChildControl("start").setValue(period.getStart());
            this.getChildControl("end").setValue(period.getEnd());
            this.__startListeningChanges();
        },

        __createAndAddDtSeparator() {
            const LONG_DASH = "\u2014";
            const dtSeparatorLabel = new qx.ui.basic.Label(LONG_DASH);
            dtSeparatorLabel.set({
                paddingTop: 5,
                marginLeft: 5,
                marginRight: 5
            });
            this.add(dtSeparatorLabel);
        },

        __startListeningChanges() {
            this.__getFields().forEach(field => field.startListeningChanges());
        },

        __stopListeningChanges() {
            this.__getFields().forEach(field => field.stopListeningChanges());
        },

        __getFields() {
            return [
                this.getChildControl("start"),
                this.getChildControl("end")
            ];
        }
    }
});
