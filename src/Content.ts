import fs from "fs";
import http from "http";
import url from "url";

function osszead(a: number, b: number): number {
    return a + b;
}
function fakrotorialis(n: number): number {
    let fakt: number = 1;
    for (let i: number = 2; i <= n; i++) {
        fakt = fakt * i;
    }
    return fakt;
}
export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Sandbox 9A</title>");
        res.write("</head>");
        res.write("<body><form><pre>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->

        // res.write("Hello Jedlik, hello 9A!");
        // res.write("<h2 style='color:green'>TypeScript</h2>");
        // res.write("próba\n");
        // res.write("alma\n");

        // let x = 12; // változó definíció
        // x = 20;
        // res.write(`Az x változó érték: ${x}\n`);
        // res.write(x.toString() + "\n");
        // const szöveg = "alma";
        // res.write(szöveg + "\n");
        // let esik: boolean;
        // esik = true;
        // esik = false;
        // res.write(`${!esik}\n`);

        res.write("Téglalap területe és kerülete\n");
        res.write("a= ");
        let oldalA: number = parseInt(params.inputa as string);
        if (isNaN(oldalA)) {
            oldalA = 20;
        }
        res.write(`<input type='number' name='inputa' value=${oldalA} style='width:5em;' onChange='this.form.submit();'>\n`);

        res.write("b= ");
        let oldalB: number = parseInt(params.inputb as string);
        if (isNaN(oldalB)) {
            oldalB = 30;
        }
        res.write(`<input type='number' name='inputb' value=${oldalB} style='width:5em;' onChange='this.form.submit();'>\n`);
        const terület = oldalA * oldalB;
        const kerület = 2 * (oldalA + oldalB);
        res.write(`Terület = ${terület} \n`);
        res.write(`Kerület = ${kerület} \n`);
        res.write("\n\n");

        res.write("Páros-páratlan meghatározó\n");
        res.write("x= ");
        let x: number = parseInt(params.inputx as string);
        if (isNaN(x)) {
            x = 0;
        }
        res.write(`<input type='number' name='inputx' value=${x} style='width:5em;' onChange='this.form.submit();'>\n`);
        if (x % 2 == 0) {
            res.write("A szám páros!\n\n\n");
        } else {
            res.write("A szám páratlan!\n\n");
        }

        res.write("KRÉTA\n");
        res.write("Kérem az osztályzatot: ");
        let jegy: number = parseInt(params.jegy as string);
        if (isNaN(jegy)) {
            jegy = 5;
        }
        res.write(`<input type='text' name='jegy' value=${jegy} style='width:5em;' onChange='this.form.submit();'>\n`);
        switch (jegy) {
            case 1:
                res.write("elégtelen\n");
                break;
            case 2:
                res.write("elégséges\n");
                break;
            case 3:
                res.write("közepes\n");
                break;
            case 4:
                res.write("jó\n");
                break;
            case 5:
                res.write("jeles\n");
                break;

            default:
                res.write("Ez nem osztályzat!\n");
                break;
        }
        res.write("\n\n");

        res.write("Másodfokú egyenlet valós gyökei\n");
        res.write("Adja meg a, b, és c értékét!\n");
        res.write("a= ");
        let a: number = parseInt(params.a as string);
        if (isNaN(a)) {
            a = 1;
        }
        res.write(`<input type='number' name='a' value=${a} style='width:5em;' onChange='this.form.submit();'>\n`);

        res.write("b= ");
        let b: number = parseInt(params.b as string);
        if (isNaN(b)) {
            b = 2;
        }
        res.write(`<input type='number' name='b' value=${b} style='width:5em;' onChange='this.form.submit();'>\n`);

        res.write("c= ");
        let c: number = parseInt(params.c as string);
        if (isNaN(c)) {
            c = 1;
        }
        res.write(`<input type='number' name='c' value=${c} style='width:5em;' onChange='this.form.submit();'>\n`);

        if (a != 0) {
            if (Math.pow(b, 2) >= 4 * a * c) {
                if (Math.pow(b, 2) > 4 * a * c) {
                    res.write("Két gyök!");
                    const x1: number = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
                    res.write(`x1 = ${x1}\n`);
                    const x2: number = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
                    res.write(`x2 = ${x2}\n`);
                } else {
                    res.write("Egy gyök!");
                    const x: number = -b / (2 * a);
                    res.write(`x = ${x}\n`);
                }
            } else res.write("Nincs valós gyök!");
        } else {
            res.write("Nem másodfokú!");
            if (b != 0) {
                const x: number = -c / b;
                res.write(`x = ${x}\n`);
            } else {
                if (c != 0) res.write("Ellentmondás !\n");
                else res.write("Azonosság !\n");
            }
        }
        res.write("\n\n");

        res.write("Függvény hívása\n");
        let x1: number;
        x1 = 4;
        x1++; // x1= x1 + 1
        let x2: number;
        x2 = 4;
        x2--; // x2 = x2 + 2
        const osszeg: number = osszead(x1, x2);
        res.write(`${x1}+${x2}=${osszeg}\n`);
        res.write("Szám faktoriálisa\n");
        res.write("Kérem a számot!\n");

        let n: number = parseInt(params.n as string);
        if (isNaN(n)) {
            n = 5;
        }
        res.write(`<input type='text' name='n' value=${n} style='width:5em;' onChange='this.form.submit();'>\n`);
        res.write(`${n}!=${fakrotorialis(n)}`);

        //  Tömbök - összetett adatszerkezet, több adat tárolására alkalmas

        res.write("\nTömbök\n");
        const nevek: string[] = ["Andi", "Anna", "Bence", "Laci"];
        for (let i: number = 0; i < nevek.length; i++) {
            res.write(nevek[i] + "\n");
        }

        res.write("\n\nLegnagyobb közös osztó (LNKO) meghatározása kivonásos algoritmussal\n");
        res.write("k=");
        let k: number = parseInt(params.k as string);
        if (isNaN(k)) {
            k = 20;
        }
        res.write(`<input type='text' name='k' value=${k} style='width:5em;' onChange='this.form.submit();'>\n`);

        res.write("l=");
        let l: number = parseInt(params.l as string);
        if (isNaN(l)) {
            l = 60;
        }
        res.write(`<input type='text' name='l' value=${l} style='width:5em;' onChange='this.form.submit();'>\n`);
        while (k != l) {
            if (k > l) k = k - l;
            else l = l - k;
        }
        res.write(`A két szám LNKO-ja: ${k}`);

        res.write("\n\nLegnagyobb közös osztó (LNKO) meghatározása euklideszi módszerrel\n");
        res.write("g=");
        let g: number = parseInt(params.g as string);
        if (isNaN(g)) {
            g = 20;
        }
        res.write(`<input type='text' name='g' value=${g} style='width:5em;' onChange='this.form.submit();'>\n`);

        res.write("h=");
        let h: number = parseInt(params.h as string);
        if (isNaN(h)) {
            h = 60;
        }
        res.write(`<input type='text' name='h' value=${h} style='width:5em;' onChange='this.form.submit();'>\n`);
        let m: number = parseInt(params.m as string);
        do {
            m = g % h; //maradékos osztás
            g = h; //előző maradék
            h = m; //új maradék
        } while (m != 0);
        res.write(`A két szám LNKO-ja: ${g}`);

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
