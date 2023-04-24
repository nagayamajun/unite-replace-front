# hack-u プロジェクト

## 始め方

このリポジトリをクローンして、

```bash
npm i
```

してみてください。
その後、

```bash
npm run dev
```

で立ち上がると思います。

## 技術スタック

TypeScript  
Next.js  
Firebase  
TailwindCSS  
Recoil

## ちょっとしたルールみたいなもの

・`export default`は、`pages/`ディレクトリ以下以外では使わない方針でお願いします 🙇‍♂️.   
=> 名前付きインポートで統一したほうが開発体験がいいため。(参考: https://engineering.linecorp.com/ja/blog/you-dont-need-default-export/).   
`pages/`以下以外は、以下のような形で統一

```bash
export const Hoge = (): JSX.Element => {...}
```
# unite-firebase
# unite-firebase
# unite-next-front
