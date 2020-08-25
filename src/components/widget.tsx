
import React, { useRef, useEffect, useState } from 'react';

declare var com: any
interface WirisProps {
    value: string
    onChange: any
    style?: React.CSSProperties
}

export const WirisMathType: React.FC<WirisProps> = function (props) {
    const inputEl = useRef(null);

    function changeStyleHeight(el: any, height: number) {
        el.style.height = `${height}px`;
    }
    useEffect(() => {
        try {
            /*eslint no-undef: "error"*/
            let editor = com.wiris.jsEditor.JsEditor.newInstance({
                language: "en",
            });
            // editor.insertInto(document.getElementById("editorContainer"));
            editor.insertInto(inputEl.current);

            editor.getEditorModel().addEditorListener({
                contentChanged: function (instance: any) {
                    if (instance.getFormulaHeight() > 175) {
                        if (inputEl.current) {
                            changeStyleHeight(inputEl.current, instance.getFormulaHeight() - 175 + 300);
                        }
                    }
                    props.onChange(editor.getMathML());
                },
                caretPositionChanged: function (instance: any) {
                }
            });
            editor.setMathML(props.value);
        } catch (e) {
            console.log(e)
        }
    }, []);

    const effectiveStyle: React.CSSProperties = {
        height: 300,
        ...props.style,
    };

    return <div ref={inputEl} className="editor-container" style={effectiveStyle} />;
};