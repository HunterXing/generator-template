import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';


function copyDirectory(src: string, dest: string, context: any) {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    entries.forEach(entry => {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            fs.mkdirSync(destPath);
            copyDirectory(srcPath, destPath, context);
        } else {
            const content = fs.readFileSync(srcPath, 'utf-8');
            // 文件以.hbs结尾，使用handlebars渲染
            if (path.extname(srcPath) === '.hbs') {
                const template = Handlebars.compile(content);
                const result = template(context);
                fs.writeFileSync(destPath.replace('.hbs', ''), result, 'utf-8');
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    });
}

export async function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('template-generator.generateTemplate', async (uri: vscode.Uri) => {
        // 遍历templates文件夹，获取所有模板名称列表
        const templates = fs.readdirSync(path.join(context.extensionPath, 'templates'));

        let selection = await vscode.window.showQuickPick(templates, { placeHolder: '请选择模板' });

        let component_name = await vscode.window.showInputBox({ 
            prompt: '请输入组件名称', 
            placeHolder: '请输入组件名称[eg:AIMange](默认Demo)',
        });

        let request_path = await vscode.window.showInputBox({ 
            prompt: '请输入请求路径', 
            placeHolder: '请输入接口路径[eg:ai-manage/algo](默认云端mock)',
        });

        const srcPath = path.join(context.extensionPath, 'templates', selection as string);
        const destPath = path.join(uri.fsPath, component_name || 'Demo');
        
        fs.mkdirSync(destPath);
        copyDirectory(srcPath, destPath, { 
           component_name: component_name, 
           request_path: request_path || 'ai-manage/algo'
         });

        vscode.window.showInformationMessage('模板生成成功');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
