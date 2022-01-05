import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';
import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed';

const editorConfiguration = {
    plugins: [],
    toolbar: ['htmlEmbed']
};
const Editor = () => {
    const [contentData, setContentData] = useState('');
    return (
        <div className="App">
            <h2>Using CKEditor 5 build in React</h2>
            <button type="button" onClick={() => console.log(contentData)}>
                Submit
            </button>

            <div id="#editor" />

            <div dangerouslySetInnerHTML={{ __html: contentData }} />

            <CKEditor
                disabled
                editor={ClassicEditor}
                data={`<p>&nbsp;</p><p>Hello from CKEditor 5!ssdasdasd</p><p><strong>asdasd</strong></p><p>&nbsp;</p><figure class="table"><table><tbody><tr><td>sad</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>sd</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>asd</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>dsa</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure><blockquote><p>sadasdsda</p></blockquote>`}
                onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    setContentData(data);
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </div>
    );
};

export default Editor;
