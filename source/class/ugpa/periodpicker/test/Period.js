/* ************************************************************************

   Copyright: 2022 ООО "НПП "ЮГПРОМАВТОМАТИЗАЦИЯ"

   License: MIT license

   Authors: Dmitrii Zolotov (goldim) zolotovdy@yandex.ru

************************************************************************ */

/**
 * This class demonstrates how to define unit tests for your application.
 *
 * Execute <code>qx test</code> to generate a testrunner application
 * and open it from <tt>test/index.html</tt>
 *
 * The methods that contain the tests are instance methods with a
 * <code>test</code> prefix. You can create an arbitrary number of test
 * classes like this one. They can be organized in a regular class hierarchy,
 * i.e. using deeper namespaces and a corresponding file structure within the
 * <tt>test</tt> folder.
 */
qx.Class.define("ugpa.periodpicker.test.Period", {
    extend : qx.dev.unit.TestCase,

    members: {
        testValidPeriod() {
            const period = new ugpa.periodpicker.Period(1, 2);

            this.assertEquals(1, period.getStart());
            this.assertEquals(2, period.getEnd());
            this.assertTrue(period.isValid());
        },

        testInvalidPeriod() {
            const period = new ugpa.periodpicker.Period(2, 1);

            this.assertFalse(period.isValid());
        }
    }
});
