qx.Class.define("ugpa.periodpicker.DateTimeField", {
    extend : qx.ui.core.Widget,

    construct() {
        // noinspection JSAnnotator
        super();
        this._setLayout(new qx.ui.layout.HBox());
        this._createChildControl("datefield");
        this.__prevValue = this.getChildControl("datefield").getValue();
        this._createChildControl("timefield");
        this.startListeningChanges();
    },

    events:{
        "changePeriod": "qx.event.type.Event"
    },

    properties: {
        // overridden
        appearance: {
            refine: true,
            init: "date-time-field"
        },

        minDate: {
            check: "Date",
            init: null,
            nullable: true,
            apply: "_applyMinDate"
        },

        maxDate: {
            check: "Date",
            init: null,
            nullable: true,
            apply: "_applyMaxDate"
        },

        valid: {
            init: true,
            check: "Boolean",
            apply: "_applyValid"
        }
    },

    members: {
        _applyValid(value) {
            this.getChildControl("datefield").setValid(value);
            this.getChildControl("timefield").setValid(value);
        },

        _createChildControlImpl(id, hash) {
            let control;
            switch (id) {
                case "datefield":
                    control = this.__createDateField();
                    this._add(control);
                    break;
                case "timefield":
                    control = new ugpa.timefield.Field();
                    control.setValue(0);
                    this._add(control);
                    break;
            }
            return control || super._createChildControlImpl(id, hash);
        },

        _applyMinDate(value) {
            const calendar = this.__getCalendar();
            calendar.setMinValue(value);
        },

        _applyMaxDate(value) {
            const calendar = this.__getCalendar();
            calendar.setMaxValue(value);
        },

        __getCalendar() {
            return this.getChildControl("datefield", true).getChildControl("list");
        },

        getValue() {
            const date = this.getChildControl("datefield").getValue();
            const time = this.getChildControl("timefield").getValue();
            ugpa.periodpicker.helper.DateTime.addTimeToDate(date, time);
            return date;
        },

        setValue(value) {
            this.__prevValue = this.getValue();
            this.getChildControl("datefield").setValue(value);
            const seconds = ugpa.periodpicker.helper.DateTime.getSeconds(value);
            this.getChildControl("timefield").setValue(seconds);
        },

        __createDateField() {
            const field = new qx.ui.form.DateField();
            field.setValue(new Date());
            field.getChildControl("textfield").setTextAlign("center");
            field.setDateFormat(new qx.util.format.DateFormat("dd.MM.yyyy"));
            field.setPlaceholder("дд.мм.гггг");
            field.getChildControl("button").exclude();
            field.addListener("click", function() {
                this.getChildControl("button").execute();
            });
            return field;
        },

        _onPeriodChanged() {
            this.fireEvent("changePeriod");
        },

        _onDateFieldChanged(e) {
            const date = e.getData();
            if (!isNaN(Date.parse(date))) {
                this.__prevValue = new Date(date);
                this._onPeriodChanged();
            } else {
                this.stopListeningChanges();
                this.getChildControl("datefield").setValue(this.__prevValue);
                this.startListeningChanges();
            }
        },

        startListeningChanges() {
            this.getChildControl("datefield").addListener("changeValue", this._onDateFieldChanged, this);
            this.getChildControl("timefield").addListener("stopScrolling", this._onPeriodChanged, this);
        },

        stopListeningChanges() {
            this.getChildControl("datefield").removeListener("changeValue", this._onDateFieldChanged, this);
            this.getChildControl("timefield").removeListener("stopScrolling", this._onPeriodChanged, this);
        }
    }
});
