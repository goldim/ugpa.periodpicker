qx.Class.define("ugpa.periodpicker.Button", {
    extend : qx.ui.form.MenuButton,
    include: [qx.locale.MTranslation],

    construct() {
        // noinspection JSAnnotator
        super(this.tr("Interval"));
        this.__createMenu();
    },

    events:{
        "changePeriod": "qx.event.type.Data"
    },

    members: {
        __getButtons() {
            const helper = ugpa.periodpicker.helper.DateTime;
            return [
                {
                    label: this.tr("Current minute"),
                    method: helper.getCurrentMinutePeriod.bind(helper)
                },
                {
                    label: this.tr("Current hour"),
                    method: helper.getCurrentHourPeriod.bind(helper)
                },
                {
                    label: this.tr("Today"),
                    method: helper.getTodayPeriod.bind(helper)
                },
                {
                    label: this.tr("Yesterday"),
                    method: helper.getYesterdayPeriod.bind(helper)
                }
            ];
        },

        __createMenu() {
            const menu = new qx.ui.menu.Menu();
            this.__getButtons().forEach(function(button) {
                this.__createChangeMenuLabelBtn(button.label, button.method, menu);
            }, this);
            this.setMenu(menu);
        },

        __createChangeMenuLabelBtn(label, executeHandler, menu) {
            const btn = new qx.ui.menu.Button(label); 
            btn.addListener("execute", function() {
                this.__fireChangePeriodEvent(label, executeHandler);
            }, this);
            menu.add(btn);
            return btn;
        },

        __fireChangePeriodEvent(label, getPeriodMethod) {
            this.setLabel(label);
            const period = getPeriodMethod();
            this.fireDataEvent("changePeriod", period);
        },

        resetLabel() {
            const intervalLabel = this.tr("Interval");
            if (this.getLabel() !== intervalLabel) {
                this.setLabel(intervalLabel);
            }
        }
    }
});
