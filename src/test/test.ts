import { TestExecutor, Test, compare, TestDiagnostic } from "notus-qml-test";

@TestDiagnostic("use-qstr-translate-definition-rule")
export class UseQstrTranslateDefinitionRuleTest {

    @Test('QStr Translate Definition')
    testQStrTranslateDefinition(executor: TestExecutor) {

        executor.addCase(
            {
                name: "Invalid, without qsTr()",
                code: `Text {
                    id: txtElement
                    text: "Hello world"
                }`,
                report: function (data: any) {
                    compare(data.item, {
                        message: "Use qsTr on strings",
                        severity: 2,
                        suggestions: [
                            {
                                title: "qsTr(\"Hello world\")",
                                items: [
                                    {
                                        "newText": "qsTr(\"Hello world\")"
                                    }
                                ]
                            }
                        ]
                    });
                }
            }
        )

        executor.addCase(
            {
                name: "With qsTr()",
                code: `Text {
                    id: txtElement
                    text: qsTr("Hello world")
                }`,
            }
        )

        executor.run();
    }

}