import axios from 'axios';
import * as cheerio from 'cheerio';

const URL = 'https://sudema.pb.gov.br/qualidade-do-ambiente/qualidade-dos-mares';

async function buscarLinksPDF() {
  try {
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data);

    const links: string[] = [];

    $('a').each((_, el) => {
      const href = $(el).attr('href');
      if (href && href.endsWith('.pdf')) {
        const linkCompleto = href.startsWith('http') ? href : `https://sudema.pb.gov.br${href}`;
        links.push(linkCompleto);
      }
    });

    console.log('Relatórios encontrados:\n', links);
  } catch (erro) {
    console.error('Erro ao buscar os relatórios:', erro);
  }
}

buscarLinksPDF();
