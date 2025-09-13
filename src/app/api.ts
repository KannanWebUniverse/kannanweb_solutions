

export const fetchCSV = async (gid: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_DOCSHEET
    const url = `${baseUrl}gid=${gid}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch CSV: ${res.status}`);
    }
    const text = await res.text();
    const lines = text.trim().split('\n'); // Trim to remove empty last lines
    const headers = lines[0].split(',').map(h => h.trim());

    return lines.slice(1).map(line => {
        const cells = line.split(',').map(cell => cell.trim());
        let obj = {};
        headers.forEach((header, i) => {
            obj[header] = cells[i] || "";
        });
        return obj;
    });
};
